export const LOGIN = `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      avatar
    }
  }
`;

export const REGISTER = `
  mutation Register($data: UserInput!) {
    register(data: $data) {
      id
      name
      email
      avatar
    }
  }
`;

export const UPDATE_PROFILE = `
  mutation UpdateProfile($data: UserInput!) {
    updateProfile(data: $data) {
      id
      name
      email
      avatar
    }
  }
`;