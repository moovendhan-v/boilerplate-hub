export const GET_BOILERPLATE_DETAILS = `
  query GetBoilerplateDetails($id: ID!) {
    boilerplate(id: $id) {
      id
      name
      description
      tags
      framework
      language
      stars
      downloads
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const GET_BOILERPLATES = `
  query GetBoilerplates {
    boilerplates {
      id
      name
      description
      tags
      framework
      language
      stars
      downloads
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const CREATE_BOILERPLATE = `
  mutation CreateBoilerplate($data: CreateBoilerplateInput!) {
    createBoilerplate(data: $data) {
      id
      name
      description
      tags
      framework
      language
      stars
      downloads
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const UPDATE_BOILERPLATE = `
  mutation UpdateBoilerplate($id: ID!, $data: UpdateBoilerplateInput!) {
    updateBoilerplate(id: $id, data: $data) {
      id
      name
      description
      tags
      framework
      language
      stars
      downloads
      createdAt
      updatedAt
      author {
        id
        name
        avatar
      }
    }
  }
`;

export const DELETE_BOILERPLATE = `
  mutation DeleteBoilerplate($id: ID!) {
    deleteBoilerplate(id: $id)
  }
`;