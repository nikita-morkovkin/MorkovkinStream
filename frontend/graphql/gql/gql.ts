/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}": typeof types.CreateUserDocument,
    "mutation LoginUser($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}": typeof types.LoginUserDocument,
    "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}": typeof types.VerifyAccountDocument,
    "query FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    username\n    avatar\n    email\n  }\n}": typeof types.FindChannelByUsernameDocument,
};
const documents: Documents = {
    "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}": types.CreateUserDocument,
    "mutation LoginUser($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}": types.LoginUserDocument,
    "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}": types.VerifyAccountDocument,
    "query FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    username\n    avatar\n    email\n  }\n}": types.FindChannelByUsernameDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}"): (typeof documents)["mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation LoginUser($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}"): (typeof documents)["mutation LoginUser($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}"): (typeof documents)["mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    username\n    avatar\n    email\n  }\n}"): (typeof documents)["query FindChannelByUsername($username: String!) {\n  findChannelByUsername(username: $username) {\n    username\n    avatar\n    email\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;