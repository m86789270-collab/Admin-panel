export function createLotteryInfo(data, showToast) {

    /* MAIN CONTAINER */

    const container = document.createElement("div");

    container.className = "lottery-info";

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

    /* CREATE INFORMATION FIELD */

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

        container.appendChild(row);

    }

    /* PHONE NUMBER */

    const phoneNumber = getValue([

        "phoneNumber",
        "phone",
        "mobileNumber",
        "mobile"

    ]);

    createField(
        "📱 Phone Number",
        phoneNumber,
        true
    );

    /* LOTTERY EXPIRY DATE */

    const lotteryExpiry = getValue([

        "testDate",
        "lotteryExpiry"

    ]);

    createField(
        "📅 Lottery Expiry Date",
        lotteryExpiry,
        true
    );

    /* THREE DIGIT LOTTERY CODE */

    const lotteryCode = getValue([

        "testCode",
        "lotteryCode",
        "code3digit"

    ]);

    createField(
        "🔐 Lottery Security Code",
        lotteryCode,
        true
    );

    return container;

}