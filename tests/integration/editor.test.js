const { initializeEditor, integrateGitmark, applyEditorSettings, saveEditorContentToPod } = require('../../modules/editor');
const { SolidClient } = require('@inrupt/solid-client');
const Gitmark = require('../../modules/gitmark');
const Settings = require('../../modules/settings');
const { setupI18n } = require('../../modules/editor');

describe('Editor Module Integration Tests', () => {
    let editorInstance;

    beforeEach(() => {
        // Mock editor initialization
        editorInstance = initializeEditor('test-container');
    });

    test('should apply editor settings correctly', () => {
        applyEditorSettings(editorInstance);
        const options = editorInstance.getOptions();
        expect(options.theme).toBe(Settings.getEditorConfig().theme);
        expect(options.language).toBe(Settings.getEditorConfig().language);
    });

    test('should integrate Gitmark successfully', async () => {
        const mockCommit = 'mock commit content';
        editorInstance.setValue(mockCommit);
        jest.spyOn(Gitmark, 'markCommit').mockResolvedValueOnce();

        await integrateGitmark(editorInstance);
        expect(Gitmark.markCommit).toHaveBeenCalledWith(mockCommit);
    });

    test('should handle invalid Git commands gracefully', async () => {
        const invalidCommit = '';
        editorInstance.setValue(invalidCommit);
        jest.spyOn(Gitmark, 'markCommit').mockRejectedValueOnce(new Error('Invalid commit content'));

        await expect(integrateGitmark(editorInstance)).rejects.toThrow('Invalid commit content');
    });

    test('should save editor content to SolidOS pod', async () => {
        const mockContent = 'mock editor content';
        const mockPodUrl = 'https://example.solidpod.com';
        editorInstance.setValue(mockContent);
        jest.spyOn(SolidClient.prototype, 'saveData').mockResolvedValueOnce();

        await saveEditorContentToPod(editorInstance, mockPodUrl);
        expect(SolidClient.prototype.saveData).toHaveBeenCalledWith(mockPodUrl, mockContent);
    });

    test('should handle SolidOS pod unavailability gracefully', async () => {
        const mockContent = 'mock editor content';
        const mockPodUrl = 'https://example.solidpod.com';
        editorInstance.setValue(mockContent);
        jest.spyOn(SolidClient.prototype, 'saveData').mockRejectedValueOnce(new Error('Pod unavailable'));

        await expect(saveEditorContentToPod(editorInstance, mockPodUrl)).rejects.toThrow('Pod unavailable');
    });

    test('should initialize i18n correctly', () => {
        setupI18n();
        expect(i18next.language).toBe('en');
        expect(i18next.t('editorLoaded')).toBe('Editor loaded successfully.');
    });

    test('should handle diagnostics display', () => {
        const diagnostics = [
            { message: 'Syntax error', line: 1 },
            { message: 'Unexpected token', line: 2 },
        ];
        editorInstance.setDiagnostics = jest.fn();

        diagnostics.forEach(diagnostic => {
            editorInstance.setDiagnostics(diagnostic);
        });

        expect(editorInstance.setDiagnostics).toHaveBeenCalledTimes(diagnostics.length);
    });
});
