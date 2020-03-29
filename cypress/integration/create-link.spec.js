describe('creating link', function () {
  it('fills form and successfully submits', function () {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/redirect',
      response: {
        success: true,
      },
    })

    cy.visit('/')

    cy.get('input').first().type('https://www.google.com')
    cy.get('input').last().type('google')

    cy.get('button').contains('Create').click()

    cy.contains('Successfully created link. Click me to copy.').click()
    cy.contains('Copied.')
  })
})
