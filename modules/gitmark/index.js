const { Octokit } = require('@octokit/rest');
const GitLab = require('gitlab');
const { Wallet } = require('@cashtab/wallet-lib');
const { SolidClient } = require('@inrupt/solid-client-authn-browser');
const Quadstore = require('quadstore');
const i18next = require('i18next');

// Initialize Octokit for GitHub API
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Initialize GitLab API
const gitlab = new GitLab({
  token: process.env.GITLAB_TOKEN,
});

// Initialize Quadstore
const quadstore = new Quadstore();

// Function to mark a commit
async function markCommit(platform, commitHash, metadata) {
  try {
    console.log(i18next.t('marking_commit'), commitHash);
    let response;
    if (platform === 'github') {
      response = await octokit.repos.createCommitComment({
        owner: metadata.owner,
        repo: metadata.repo,
        commit_sha: commitHash,
        body: metadata.comment,
      });
    } else if (platform === 'gitlab') {
      response = await gitlab.Commits.createComment(metadata.projectId, commitHash, {
        note: metadata.comment,
      });
    } else {
      throw new Error(i18next.t('unsupported_platform'));
    }

    console.log(i18next.t('commit_marked_successfully'));
    return response;
  } catch (error) {
    console.error(i18next.t('error_marking_commit'), error);
    throw error;
  }
}

// Function to authenticate with SolidOS
async function authenticateSolidOS() {
  try {
    const session = await SolidClient.login({
      oidcIssuer: process.env.SOLID_ISSUER,
      redirectUrl: process.env.SOLID_REDIRECT_URL,
      clientId: process.env.SOLID_CLIENT_ID,
      clientSecret: process.env.SOLID_CLIENT_SECRET,
    });
    return session;
  } catch (error) {
    console.error('Error authenticating with SolidOS:', error);
    throw error;
  }
}

// Function to integrate with Cashtab for eCash transactions
async function integrateCashtab(transactionDetails, privateKey) {
  try {
    const signedTransaction = await walletLib.createAndSignTransaction(transactionDetails, privateKey);
    console.log('eCash transaction signed successfully:', signedTransaction);
    return signedTransaction;
  } catch (error) {
    console.error('Error integrating with Cashtab:', error);
    throw error;
  }
}

// Function to integrate with Work module for project tracking
async function integrateWork(projectId, taskDetails) {
  try {
    const workManager = new WorkManager();
    const task = workManager.addTask(projectId, taskDetails.name, taskDetails.assignee);
    console.log('Task added to project successfully:', task);
    return task;
  } catch (error) {
    console.error('Error integrating with Work module:', error);
    throw error;
  }
}

// Function to store commit marks in SolidOS pods
async function storeInSolidPod(podUrl, commitMarkData) {
  try {
    const solidClient = new SolidClient();
    await solidClient.saveFile(`${podUrl}/commitMarks.json`, JSON.stringify(commitMarkData), {
      contentType: 'application/json',
    });
    console.log('Commit mark data stored in SolidOS pod successfully:', podUrl);
  } catch (error) {
    console.error('Error storing commit mark data in SolidOS pod:', error);
    throw error;
  }
}

module.exports = {
  markCommit,
  authenticateSolidOS,
  integrateCashtab,
  integrateWork,
  storeInSolidPod,
};
