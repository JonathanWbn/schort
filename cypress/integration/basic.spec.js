describe('basic stuff', function() {
  it('loads essential ui', function() {
    cy.visit('/')
    cy.contains('just another URL shortener')
    cy.get('form').contains('https://btfl.link/')
    cy.get('button').contains('Create')
    cy.contains('GitHub')
    cy.contains('Impressum')
  })

  it('allows to navigate to Impressum', function() {
    cy.visit('/')
    cy.contains('Impressum').click()
    cy.contains('Impressum')
    cy.contains('Jonathan Wieben')
    cy.contains('Alfredstr. 61')
    cy.contains('joni.wieben@icloud.com')
  })
})
