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
    "mutation LogoutUser {\n  logout\n}": typeof types.LogoutUserDocument,
    "mutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}": typeof types.NewPasswordDocument,
    "mutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}": typeof types.ResetPasswordDocument,
    "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}": typeof types.VerifyAccountDocument,
    "mutation ClearSessionCookie {\n  clearSessionCookie\n}": typeof types.ClearSessionCookieDocument,
    "mutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}": typeof types.ChangeProfileAvatarDocument,
    "mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}": typeof types.ChangeProfileInfoDocument,
    "mutation RemoveProfileAvatar {\n  removeAvatar\n}": typeof types.RemoveProfileAvatarDocument,
    "mutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}": typeof types.CreateSocialLinkDocument,
    "mutation removeSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}": typeof types.RemoveSocialLinkDocument,
    "mutation ReorderSocialLinks($list: [ReorderSocialLinksInput!]!) {\n  reorderSocialLinks(list: $list)\n}": typeof types.ReorderSocialLinksDocument,
    "mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}": typeof types.UpdateSocialLinkDocument,
    "query FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}": typeof types.FindRecommendedChannelsDocument,
    "query FindNotificationsByUser {\n  findNotificationsByUser {\n    id\n    message\n    type\n    createdAt\n  }\n}": typeof types.FindNotificationsByUserDocument,
    "query FindCurrentProfile {\n  findCurrentProfile {\n    username\n    email\n    isTotpEnabled\n    avatar\n    bio\n    displayName\n  }\n}": typeof types.FindCurrentProfileDocument,
    "query FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}": typeof types.FindSocialLinksDocument,
    "query FindUnreadNotificationsCount {\n  findUnreadNotificationCount\n}": typeof types.FindUnreadNotificationsCountDocument,
};
const documents: Documents = {
    "mutation CreateUser($data: CreateUserInput!) {\n  createUser(data: $data)\n}": types.CreateUserDocument,
    "mutation LoginUser($data: LoginInput!) {\n  login(data: $data) {\n    user {\n      username\n    }\n    message\n  }\n}": types.LoginUserDocument,
    "mutation LogoutUser {\n  logout\n}": types.LogoutUserDocument,
    "mutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}": types.NewPasswordDocument,
    "mutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}": types.ResetPasswordDocument,
    "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}": types.VerifyAccountDocument,
    "mutation ClearSessionCookie {\n  clearSessionCookie\n}": types.ClearSessionCookieDocument,
    "mutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}": types.ChangeProfileAvatarDocument,
    "mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}": types.ChangeProfileInfoDocument,
    "mutation RemoveProfileAvatar {\n  removeAvatar\n}": types.RemoveProfileAvatarDocument,
    "mutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}": types.CreateSocialLinkDocument,
    "mutation removeSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}": types.RemoveSocialLinkDocument,
    "mutation ReorderSocialLinks($list: [ReorderSocialLinksInput!]!) {\n  reorderSocialLinks(list: $list)\n}": types.ReorderSocialLinksDocument,
    "mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}": types.UpdateSocialLinkDocument,
    "query FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}": types.FindRecommendedChannelsDocument,
    "query FindNotificationsByUser {\n  findNotificationsByUser {\n    id\n    message\n    type\n    createdAt\n  }\n}": types.FindNotificationsByUserDocument,
    "query FindCurrentProfile {\n  findCurrentProfile {\n    username\n    email\n    isTotpEnabled\n    avatar\n    bio\n    displayName\n  }\n}": types.FindCurrentProfileDocument,
    "query FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}": types.FindSocialLinksDocument,
    "query FindUnreadNotificationsCount {\n  findUnreadNotificationCount\n}": types.FindUnreadNotificationsCountDocument,
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
export function graphql(source: "mutation LogoutUser {\n  logout\n}"): (typeof documents)["mutation LogoutUser {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}"): (typeof documents)["mutation NewPassword($data: NewPasswordInput!) {\n  newPassword(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}"): (typeof documents)["mutation ResetPassword($data: ResetPasswordInput!) {\n  resetPassword(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}"): (typeof documents)["mutation VerifyAccount($data: VerificationInput!) {\n  verifyAccount(data: $data) {\n    isEmailVerified\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ClearSessionCookie {\n  clearSessionCookie\n}"): (typeof documents)["mutation ClearSessionCookie {\n  clearSessionCookie\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}"): (typeof documents)["mutation ChangeProfileAvatar($avatar: Upload!) {\n  changeProfileAvatar(avatar: $avatar)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}"): (typeof documents)["mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {\n  changeProfileInfo(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveProfileAvatar {\n  removeAvatar\n}"): (typeof documents)["mutation RemoveProfileAvatar {\n  removeAvatar\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}"): (typeof documents)["mutation CreateSocialLink($data: SocialLinkInput!) {\n  createSocialLink(data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation removeSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}"): (typeof documents)["mutation removeSocialLink($id: String!) {\n  removeSocialLink(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReorderSocialLinks($list: [ReorderSocialLinksInput!]!) {\n  reorderSocialLinks(list: $list)\n}"): (typeof documents)["mutation ReorderSocialLinks($list: [ReorderSocialLinksInput!]!) {\n  reorderSocialLinks(list: $list)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}"): (typeof documents)["mutation UpdateSocialLink($id: String!, $data: SocialLinkInput!) {\n  updateSocialLink(id: $id, data: $data)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}"): (typeof documents)["query FindRecommendedChannels {\n  findRecommendedChannels {\n    username\n    avatar\n    isVerified\n    stream {\n      isLive\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindNotificationsByUser {\n  findNotificationsByUser {\n    id\n    message\n    type\n    createdAt\n  }\n}"): (typeof documents)["query FindNotificationsByUser {\n  findNotificationsByUser {\n    id\n    message\n    type\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindCurrentProfile {\n  findCurrentProfile {\n    username\n    email\n    isTotpEnabled\n    avatar\n    bio\n    displayName\n  }\n}"): (typeof documents)["query FindCurrentProfile {\n  findCurrentProfile {\n    username\n    email\n    isTotpEnabled\n    avatar\n    bio\n    displayName\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}"): (typeof documents)["query FindSocialLinks {\n  findSocialLinks {\n    id\n    title\n    url\n    position\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query FindUnreadNotificationsCount {\n  findUnreadNotificationCount\n}"): (typeof documents)["query FindUnreadNotificationsCount {\n  findUnreadNotificationCount\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;