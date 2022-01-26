/**
 * Copyright (c) 2021 Gitpod GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */


function CheckBox(props: {
    name?: string,
    title: string | React.ReactNode,
    desc: string | React.ReactNode,
    checked: boolean,
    disabled?: boolean,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    className?: string,
    titleClass?: string,
}) {
    const inputProps: React.InputHTMLAttributes<HTMLInputElement> = {
        checked: props.checked,
        disabled: props.disabled,
        onChange: props.onChange,
    };
    if (props.name) {
        inputProps.name = props.name;
    }

    const checkboxId = `checkbox-${props.title}-${String(Math.random())}`;
    const titleStyle = props.titleClass ?? "text-gray-800 dark:text-gray-100 font-semibold cursor-pointer tracking-wide text-md"
    const containerStyle = `grid grid-cols-1 content-center items-center ${props.className ?? "mt-4 max-w-2xl"}`


    return <div className={containerStyle}>
        <div className="flex items-center max-w-2xl space-x-2 flex-grow">
            <input className={"h-4 w-4 focus:ring-0 rounded cursor-pointer bg-transparent border-2 dark:filter-invert border-gray-800 dark:border-gray-900 focus:border-gray-900 dark:focus:border-gray-800 " + (props.checked ? 'bg-gray-800 dark:bg-gray-900' : '')} type="checkbox"
                id={checkboxId}
                {...inputProps}
            />
            <label htmlFor={checkboxId} className={titleStyle}>{props.title}</label>
        </div>
        <div className="text-gray-500 dark:text-gray-400 text-md ml-6">{props.desc}</div>
    </div>
}

export default CheckBox;