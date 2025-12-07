function helloPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello, World!");
        }, 2000);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById("run");
    const loader = document.getElementById("loader");
    const result = document.getElementById("result");

    runBtn.addEventListener("click", () => {
        loader.style.display = "block";
        result.textContent = "";

        helloPromise()
            .then(message => {
                result.textContent = message;
            })
            .finally(() => {
                loader.style.display = "none";
            });
    });
});
