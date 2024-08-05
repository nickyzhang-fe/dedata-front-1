/*
 * @Date: 2024-06-02 21:59:59
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2024-06-03 23:42:21
 * @FilePath: /dedata-front/app/components/ContentHeader.tsx
 * @Description: 
 */
"use client";

import { Select, message } from "antd";
import { ROLES, LANGUAGES } from "@/app/utils/constant";
import { useEffect, useState } from "react";

function ContentHeader(props: any) {
    const [languageStatus, setLanguageStatus] = useState(1);
    const [roleStatus, setRoleStatus] = useState(1);
    const [disabled, setDisabled] = useState();
    useEffect(() => {
        setDisabled(props.disabled);
    }, [props.disabled]);

    function languageChange(value: number) {
        setLanguageStatus(value);
    }

    function roleChange(value: number) {
        setRoleStatus(value);
    }

    function applyCaseChange() {
        console.log("---->applyCaseChange", disabled);
        if (disabled) {
            message.info('请先完成当前任务')
            return
        }
        props.onApplyChange(true);
        props.onRoleAndLanguageChange({
            languageStatus,
            roleStatus,
        });
    }

    return (
        <div className="flex justify-between items-center">
            <span className="text-[0.16rem] font-bold text-[#000]">
                {props.title}
            </span>
            <div className="flex items-center h-[0.4rem]">
                <Select
                    defaultValue={1}
                    style={{ width: "1.5rem", height: "0.4rem" }}
                    onChange={languageChange}
                    options={LANGUAGES}
                    disabled={disabled}
                />
                <span className="text-[0.14rem] text-[#333] ml-[0.1rem]">
                    Role:
                </span>
                <Select
                    defaultValue={1}
                    style={{ width: "1.5rem", height: "0.4rem" }}
                    onChange={roleChange}
                    options={ROLES}
                    disabled={disabled}
                />
                <div
                    className="bg-[#3A54DF] h-[0.4rem] leading-[0.4rem] text-center w-[1.28rem] text-[#fff] text-[0.16rem] cursor-pointer rounded-[0.16rem] ml-[0.1rem]"
                    onClick={applyCaseChange}
                >
                    + Apply Case
                </div>
            </div>
        </div>
    );
}
export default ContentHeader;
