import React from 'react';

interface IProps {
    name: string,
    setName: (value: string) => void,
    author: string,
    setAuthor: (value: string) => void,
    description: string,
    setDescription: (value: string) => void
}

export default function LeftPanel(props: IProps) {
    return <p>Place holder for left panel</p>
}