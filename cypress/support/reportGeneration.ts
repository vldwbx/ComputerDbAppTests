const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
      let item: any = runnable
      const nameParts = [runnable.title]
  
      // Iterate through all parents and grab the titles
      while (item.parent) {
        nameParts.unshift(item.parent.title)
        item = item.parent
      }
  
      const fullTestName = nameParts
              .filter(Boolean)
              .join(' -- ')           // this is how cypress joins the test title fragments
  
      const imageUrl = `screenshots/${
        Cypress.spec.name
      }/${fullTestName} (failed).png`
  
      addContext({ test }, imageUrl)
    }
  })