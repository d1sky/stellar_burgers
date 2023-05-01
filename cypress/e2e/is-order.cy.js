
const CARD_SELECTOR = '[class*=card_card]'
const CONSTRUCTOR_SELECTOR = '[class*=burger-constructor_container]'
const MODAL_CLOSE_BUTTON_SELECTOR = '[class*=modal_closeButton]'

describe('app works correctly', function () {
    beforeEach(() => {
        cy.viewport(1920, 1024);
        cy.visit('/');
    });

    it('should be find ingredient, click them, check modal is opened, close modal', () => {
        cy.contains('Соберите бургер');

        cy.get(CARD_SELECTOR).first().click()
        cy.contains('Детали ингредиента')

        cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();
    });

    it('should post order', () => {
        cy.contains('Соберите бургер');

        cy.get(CARD_SELECTOR).first().drag(CONSTRUCTOR_SELECTOR);
        cy.get(CARD_SELECTOR).eq(2).drag(CONSTRUCTOR_SELECTOR);
        cy.get(CARD_SELECTOR).eq(6).drag(CONSTRUCTOR_SELECTOR);
        cy.get(CARD_SELECTOR).eq(10).drag(CONSTRUCTOR_SELECTOR);

        cy.contains('Оформить заказ').click();

        cy.get('input').first().type('godasin@gmail.com')
        cy.get('input').last().type('142857')

        cy.get('button').contains('Войти').click();

        cy.contains('Оформить заказ').click();

        cy.contains('Ваш заказ начали готовить', { timeout: 20000 })

        cy.get(MODAL_CLOSE_BUTTON_SELECTOR).click();
    });
});