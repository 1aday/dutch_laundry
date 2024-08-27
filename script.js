document.addEventListener('DOMContentLoaded', function() {
    const decisionBtns = document.querySelectorAll('.decision-btn');
    const settingsDisplay = document.getElementById('settings-display');
    const selectedOptionsList = document.getElementById('selected-options-list');

    let fabricSensitivity = '';
    let color = '';
    let soilLevel = '';
    let fabricType = '';
    let specialConsiderations = '';

    function updateDecision(type, value) {
        switch(type) {
            case 'delicate':
            case 'normal':
                fabricSensitivity = value;
                break;
            case 'light':
            case 'dark':
            case 'bright':
                color = value;
                break;
            case 'light-soil':
            case 'normal-soil':
            case 'heavy-soil':
                soilLevel = value;
                break;
            case 'cotton':
            case 'synthetic':
            case 'wool':
                fabricType = value;
                break;
            case 'embellished':
            case 'handwash':
            case 'none':
                specialConsiderations = value;
                break;
        }
        updateSelectedOptions();
        checkAllOptionsSelected();
    }

    function updateSelectedOptions() {
        selectedOptionsList.innerHTML = '';
        if (fabricSensitivity) selectedOptionsList.innerHTML += `<li>Fabric Sensitivity: ${fabricSensitivity}</li>`;
        if (color) selectedOptionsList.innerHTML += `<li>Color: ${color}</li>`;
        if (soilLevel) selectedOptionsList.innerHTML += `<li>Soil Level: ${soilLevel}</li>`;
        if (fabricType) selectedOptionsList.innerHTML += `<li>Fabric Type: ${fabricType}</li>`;
        if (specialConsiderations) selectedOptionsList.innerHTML += `<li>Special Considerations: ${specialConsiderations}</li>`;
    }

    function checkAllOptionsSelected() {
        if (fabricSensitivity && color && soilLevel && fabricType && specialConsiderations) {
            updateSettingsDisplay();
        }
    }

    function getWashingSettings() {
        let program, temp, spinSpeed, explanation;

        if (fabricSensitivity === 'Delicate' || specialConsiderations === 'Hand Wash') {
            program = 'Fijne Was';
            temp = '30°C';
            spinSpeed = '600 TPM';
            explanation = 'Gentle cycle for delicate fabrics or hand wash items.';
        } else if (fabricType === 'Wool') {
            program = 'Wol';
            temp = '30°C';
            spinSpeed = '800 TPM';
            explanation = 'Special cycle for wool to prevent shrinkage and damage.';
        } else if (soilLevel === 'Heavy') {
            program = 'Intensief';
            temp = '60°C';
            spinSpeed = '1400 TPM';
            explanation = 'Intensive cycle for heavily soiled items.';
        } else if (color === 'Light') {
            program = 'Witte Was';
            temp = '60°C';
            spinSpeed = '1200 TPM';
            explanation = 'Hot wash for white and light-colored items.';
        } else {
            program = 'Normaal';
            temp = '40°C';
            spinSpeed = '1000 TPM';
            explanation = 'Standard cycle for regular loads.';
        }

        return { program, temp, spinSpeed, explanation };
    }

    function getDryingSettings() {
        let program, temp, time, explanation;

        if (fabricSensitivity === 'Delicate' || fabricType === 'Wool') {
            program = 'Fijne Was';
            temp = 'Laag';
            time = '40 min';
            explanation = 'Low heat and shorter time for delicate or wool items.';
        } else if (soilLevel === 'Heavy' || fabricType === 'Cotton') {
            program = 'Extra Droog';
            temp = 'Hoog';
            time = '90 min';
            explanation = 'High heat and longer time for heavy or cotton items.';
        } else {
            program = 'Kastdroog';
            temp = 'Normaal';
            time = '60 min';
            explanation = 'Standard drying for most items.';
        }

        return { program, temp, time, explanation };
    }

    function updateSettingsDisplay() {
        const washSettings = getWashingSettings();
        const drySettings = getDryingSettings();

        document.getElementById('wash-program').textContent = washSettings.program;
        document.getElementById('wash-temp').textContent = washSettings.temp;
        document.getElementById('spin-speed').textContent = washSettings.spinSpeed;
        document.getElementById('wash-program-tooltip').textContent = washSettings.explanation;
        document.getElementById('dry-program').textContent = drySettings.program;
        document.getElementById('dry-temp').textContent = drySettings.temp;
        document.getElementById('dry-time').textContent = drySettings.time;
        document.getElementById('dry-program-tooltip').textContent = drySettings.explanation;

        settingsDisplay.style.display = 'block';
    }

    decisionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.type;
            const category = btn.closest('.decision-step');
            const buttonsInCategory = category.querySelectorAll('.decision-btn');

            buttonsInCategory.forEach(categoryBtn => {
                categoryBtn.classList.remove('selected');
            });

            btn.classList.add('selected');

            const value = btn.querySelector('span').textContent;
            updateDecision(type, value);
        });
    });
});
