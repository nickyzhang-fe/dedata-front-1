"use client";

export default function setRem() {
    function handleResize() {
        console.log("resize");

        const designSize = 1440;
        const clientWidth = document.documentElement.clientWidth;
        console.log(clientWidth);

        const rem = (clientWidth * 100) / designSize;
        document.documentElement.style.fontSize = rem + "px";
        console.log(document.documentElement.style.fontSize);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
}
