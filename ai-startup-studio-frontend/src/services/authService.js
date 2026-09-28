export async function mockLogin(payload) {
  await new Promise((r) => setTimeout(r, 700));
  if (payload.email === 'fail@example.com') {
    throw new Error('Invalid credentials');
  }
  return { user: { name: 'Founder', email: payload.email }, token: 'mock-token' };
}

export async function mockRegister(payload) {
  await new Promise((r) => setTimeout(r, 800));
  return { user: { name: payload.name, email: payload.email } };
}

export async function mockForgotPassword() {
  await new Promise((r) => setTimeout(r, 700));
  return { message: 'Password reset link sent' };
}

export async function mockResetPassword() {
  await new Promise((r) => setTimeout(r, 700));
  return { message: 'Password updated successfully' };
}
