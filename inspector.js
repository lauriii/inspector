((Drupal, once) => {

  Drupal.behaviors.inspector = {
    attach(context) {
      const [ myElement ] = once('inspector', document.body);
      if (myElement) {
        const inspector = document.createElement('div');
        [...new Set([...myElement.querySelectorAll('[data-drupal-inspector-type]')].map((node) => {
          return node.getAttribute('data-drupal-inspector-type');
        }))].forEach((type) => {
          const row = document.createElement('div');
          row.innerHTML = Drupal.theme.checkbox();

          const checkbox = row.firstChild;
          checkbox.setAttribute('name', `drupal-inspector[${type}]`);
          checkbox.addEventListener('change', (e) => {
            document.body.setAttribute(`data-drupal-inspector-${type}`, e.target.checked);
          });

          const label = document.createElement('label');
          label.innerText = type;
          label.prepend(checkbox);

          row.appendChild(label);

          inspector.appendChild(row);
        });

        const heading = document.createElement('h5');
        heading.textContent = 'Toggle inspector for type'

        inspector.prepend(heading);
        inspector.setAttribute('data-drupal-selector', 'inspector');
        myElement.appendChild(inspector);
      }
    }
  }

})(Drupal, once)
