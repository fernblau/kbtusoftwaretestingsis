import { BasePage } from './BasePage';

export interface RegisterData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  state: string;
  country: string; // код страны, например 'DE'
  phone: string;   // только цифры
  email: string;
  pass: string;
}

export class RegisterPage extends BasePage {
  async goto() {
    await this.page.goto('/auth/register');
  }

  async registerNewUser(d: RegisterData) {
    const t = (id: string) => this.page.getByTestId(id);
    await t('first-name').fill(d.firstName);
    await t('last-name').fill(d.lastName);
    await t('dob').fill(d.dob);
    // страна выбирается первой: от неё зависит проверка индекса
    await t('country').selectOption(d.country);
    await t('postal_code').fill(d.postcode);
    await t('house_number').fill(d.houseNumber);
    await t('street').fill(d.street);
    await t('city').fill(d.city);
    await t('state').fill(d.state);
    await t('phone').fill(d.phone);
    await t('email').fill(d.email);
    await t('password').fill(d.pass);
    await t('register-submit').click();
  }
}
