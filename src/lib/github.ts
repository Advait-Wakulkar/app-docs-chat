import { auth } from '@clerk/nextjs/server';
import { Octokit } from 'octokit';

export const octokit = new Octokit({
    auth: process.env.Github_token
});

const githubUrl = "https://github.com/Advait-Wakulkar/app-docs-chat.git";

type Response = {
    commitHash: string;
    commitMessage: string;
    commitAuthorName: string;
    commitAuthorAvatar: string;
    commitDate: string;
};

export const getCommitHashes = async (githubUrl: string): Promise<Response[]> => {
    const { data } = await octokit.rest.repos.listCommits({
        owner: 'Advait-Wakulkar',
        repo: 'app-docs-chat'
    });

    const sortedCommits = data.sort(
        (a: any, b: any) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
    );

    return sortedCommits.slice(0, 15).map((commit: any) => ({
        commitHash: commit.sha as string,
        commitMessage: commit.commit.message ?? "",
        commitAuthorName: commit.commit?.author?.name ?? "",
        commitAuthorAvatar: commit.author?.avatar_url ?? "",
        commitDate: commit.commit?.author?.date ?? ""
    }));
};
console.log(await getCommitHashes(githubUrl))