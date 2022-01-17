/**
 * Copyright (c) 2022 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

import moment from "moment";
import { Link } from "react-router-dom";
import { ReactChild } from "react";
import { Project } from "@gitpod/gitpod-protocol";
import Prebuilds from "../projects/Prebuilds"

export default function ProjectDetail(props: { project: Project }) {
    return <>
        <div className="flex">
            <div className="flex-1">
                <div className="flex"><h3>{props.project.name}</h3><span className="my-auto ml-3"></span></div>
                <p>{props.project.cloneUrl}</p>
            </div>
        </div>
        <div className="flex mt-6">
            <div className="flex flex-col w-full">
                <div className="flex w-full mt-6">
                    <Property name="Created">{moment(props.project.creationTime).format('MMM D, YYYY')}</Property>
                    <Property name="Repository"><a className="text-blue-400 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-400" href={props.project.cloneUrl}>{props.project.name}</a></Property>
                    <Property name="Soft Deleted" >{props.project.markedDeleted ? "Yes" : "No"}</Property>
                </div>
                <div className="flex w-full mt-6">
                    <Property name="User"><Link className="text-blue-400 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-400" to={"/admin/users/" + props.project.userId}>{props.project.userId}</Link></Property>
                    <Property name="Team"><Link className="text-blue-400 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-400" to={"/admin/users/" + props.project.teamId}>{props.project.teamId}</Link></Property>
                    <Property name="Incremental Prebuilds">{props.project.settings?.useIncrementalPrebuilds ? "Yes" : "No"}</Property>
                </div>
            </div>
        </div>
        <div className="mt-6">
            <h3>Prebuilds</h3>
            <Prebuilds project={props.project} isAdminDashboard={true} />
        </div>
    </>;

    function Property(p: { name: string, children: string | ReactChild, actions?: { label: string, onClick: () => void }[] }) {
        return <div className="ml-3 flex flex-col w-4/12 truncate">
            <div className="text-base text-gray-500 truncate">
                {p.name}
            </div>
            <div className="text-lg text-gray-600 font-semibold truncate">
                {p.children}
            </div>
            {(p.actions || []).map(a =>
                <div className="cursor-pointer text-sm text-blue-400 dark:text-blue-600 hover:text-blue-600 dark:hover:text-blue-400 truncate" onClick={a.onClick}>
                    {a.label || ''}
                </div>
            )}
        </div>;
    }
}