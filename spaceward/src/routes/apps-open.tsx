function AppsOpen() {
    const queryParameters = new URLSearchParams(window.location.search);
    const url = queryParameters.get("url");

    return (
        <div className="h-[calc(100vh-64px)] p-0 md:-m-8 max-w-screen">
            <div className="h-full block pb-0 relative overflow-hidden">
                <iframe
                    className="absolute w-full h-full inset-0"
                    id=""
                    src={url}
                    sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads allow-orientation-lock allow-modals"
                    allow={`clipboard-read self ${url}; clipboard-write self ${url}`}
                ></iframe>
            </div>
        </div>
    );
}

export default AppsOpen;
