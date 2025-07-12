import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Solid from '../../src/components/Solid';

describe('Solid Pod Management Component', () => {
  test('renders Solid Pod Management UI', () => {
    render(<Solid />);

    expect(screen.getByText('Solid Pod Management')).toBeInTheDocument();
    expect(screen.getByText('Store Data')).toBeInTheDocument();
    expect(screen.getByText('Synchronize Data')).toBeInTheDocument();
  });

  test('alerts when storing data without pod URL or data', () => {
    render(<Solid />);

    const storeButton = screen.getByText('Store Data');
    fireEvent.click(storeButton);

    expect(window.alert).toHaveBeenCalledWith('Please provide both pod URL and data.');
  });

  test('alerts when synchronizing data without pod URL', () => {
    render(<Solid />);

    const syncButton = screen.getByText('Synchronize Data');
    fireEvent.click(syncButton);

    expect(window.alert).toHaveBeenCalledWith('Please provide a pod URL.');
  });

  test('displays synchronization message on successful sync', () => {
    render(<Solid />);

    const podUrlInput = screen.getByPlaceholderText('Pod URL');
    fireEvent.change(podUrlInput, { target: { value: 'https://example.solidpod.com' } });

    const syncButton = screen.getByText('Synchronize Data');
    fireEvent.click(syncButton);

    expect(screen.getByText('Synchronization successful with Solid pod at https://example.solidpod.com')).toBeInTheDocument();
  });
});
