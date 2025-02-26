import { defineNuxtPlugin } from '#app';
import { onMounted } from 'vue';

export default defineNuxtPlugin((nuxtApp) => {
  // Helper function to add dynamic styles
  const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.id = 'dynamic-style';
    document.head.appendChild(style);
  };

  // Initialize inputs (including checkboxes and radio buttons)
  const initializeInputs = () => {
    const inputContainers = document.querySelectorAll('.text-input');

    inputContainers.forEach((input: Element) => {
      const label = input.querySelector('label') as HTMLLabelElement;
      const inputbox = input.querySelector('.inputbox') as HTMLElement;

      inputbox.addEventListener('focus', () => {
        const labelWidth = label.offsetWidth;

        const style = document.createElement('style');
        style.id = 'dynamic-style';
        style.textContent = `
          .text-input:focus-within .inputbox {
            left: ${labelWidth}px;
            transition: 0.3s ease-in-out;
          }
        `;
        document.head.appendChild(style);
      });

      inputbox.addEventListener('blur', () => {
        const dynamicStyle = document.getElementById('dynamic-style');
        if (dynamicStyle) {
          dynamicStyle.remove();
        }
      });

      inputbox.addEventListener('input', () => {
        label.classList.toggle('hide', !!inputbox.textContent?.trim());
      });
    });

    initializeCheckboxesAndRadios();
  };

  // Initialize checkboxes and radio buttons
  const initializeCheckboxesAndRadios = () => {
    // Checkbox logic
    document.querySelectorAll('.checkbox').forEach((checkboxDiv: Element, index: number) => {
      const checkbox = checkboxDiv.querySelector('input[type="checkbox"]') as HTMLInputElement;
      const label = checkboxDiv.querySelector('label') as HTMLLabelElement;

      if (checkbox.id && label.getAttribute('for') === checkbox.id) return;

      const uniqueId = `checkbox-${index}`;
      checkbox.id = uniqueId;
      label.setAttribute('for', uniqueId);

      const targetBg = checkboxDiv.getAttribute('target-bg');
      if (targetBg) {
        const styleSheet = document.styleSheets[0] as CSSStyleSheet;
        const cssRule = `
          input[type="checkbox"]#${checkbox.id}:checked + label::before {
            background-color: ${targetBg};
            border-color: #${targetBg};
          }
        `;
        styleSheet.insertRule(cssRule, styleSheet.cssRules.length);
      }
    });

    // Radio logic
    document.querySelectorAll('.radio').forEach((radioDiv: Element, index: number) => {
      const radio = radioDiv.querySelector('input[type="radio"]') as HTMLInputElement;
      const label = radioDiv.querySelector('label') as HTMLLabelElement;

      if (!(radio.id && label.getAttribute('for') === radio.id)) {
        const uniqueId = `radio-${index}`;
        radio.id = uniqueId;
        label.setAttribute('for', uniqueId);
      }

      const targetBg = radioDiv.getAttribute('target-bg');
      if (targetBg) {
        const styleSheet = document.styleSheets[0] as CSSStyleSheet;
        const cssRule = `
          input[type="radio"]#${radio.id}:checked + label::before {
            background-color: ${targetBg};
            border-color: #${targetBg};
          }
        `;
        styleSheet.insertRule(cssRule, styleSheet.cssRules.length);
      }
    });
  };

  // Initialize combo boxes
  const initComboBoxes = () => {
    const comboBoxes = document.querySelectorAll('.combo-box');

    comboBoxes.forEach((comboBox) => {
      const comboInput = comboBox.querySelector('.combo-input') as HTMLInputElement;
      const comboOptions = comboBox.querySelector('.combo-options') as HTMLElement;
      const noData = comboOptions.querySelector('.no-data') as HTMLElement;
      const inputBox = comboBox.querySelector('.Combo-inputbox') as HTMLElement;

      // Show dropdown on focus
      comboInput.addEventListener('focus', () => {
        comboOptions.style.display = 'block';
        inputBox.classList.add('open');
      });

      // Hide dropdown on outside click
      document.addEventListener('click', (e) => {
        if (!comboBox.contains(e.target as Node)) {
          comboOptions.style.display = 'none';
          inputBox.classList.remove('open');
        }
      });

      // Filter options and show dropdown as user types
      comboInput.addEventListener('input', () => {
        const inputValue = comboInput.value.toLowerCase();
        let found = false;

        comboOptions.style.display = 'block';

        comboOptions.querySelectorAll('.combo-option').forEach((item) => {
          const optionItem = item as HTMLElement;
          if (optionItem.textContent?.toLowerCase().includes(inputValue)) {
            optionItem.style.display = 'block';
            found = true;
          } else {
            optionItem.style.display = 'none';
          }
        });

        // Show 'no data' message if no matches found
        noData.style.display = found ? 'none' : 'block';
      });

      // Dynamic selection for static items
      comboOptions.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('combo-option')) {
          comboInput.value = target.textContent || '';
          comboOptions.style.display = 'none';
          inputBox.classList.remove('open');
        }
      });

      // Clear input on Escape key
      comboInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          comboInput.value = '';
          comboOptions.style.display = 'block';
          noData.style.display = 'none';
          comboOptions.querySelectorAll('.combo-option').forEach((item) => {
            const optionItem = item as HTMLElement;
            optionItem.style.display = 'block';
          });
        }
      });

      // Handle when input is clicked after clearing
      comboInput.addEventListener('click', () => {
        if (comboInput.value === '') {
          comboOptions.style.display = 'block';
          noData.style.display = 'none';
          comboOptions.querySelectorAll('.combo-option').forEach((item) => {
            const optionItem = item as HTMLElement;
            optionItem.style.display = 'block';
          });
        }
      });
    });
  };

  // Use onMounted from Vue to execute when app is mounted
  onMounted(() => {
    addDynamicStyles();
    initializeInputs();
    initComboBoxes();
  });
});
