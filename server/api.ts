export interface post {
id: number;
title: string;
body: string;
}

export async function fetchPosts(): Promise<post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Failed to fetch posts: ' + response.statusText);
    }
    // const data: post[] = await response.json();
    return response.json();
}