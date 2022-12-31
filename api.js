import { gql, GraphQLClient } from "graphql-request";

const API_URL = "https://api-mumbai.lens.dev";

export const clientId = new GraphQLClient(API_URL);

export const query = gql`
  query Profile($id: ProfileId!) {
    profile(request: { profileId: $id }) {
      id
      name
      bio
      stats {
        totalFollowers
      }
    }
  }
`;

export const publicationsQuery = `
query Publications($ids: [ProfileId!]) {
  publications(request: {
    profileIds: $ids,
    limit:50
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      
      
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
     displayType
     traitType
     key
     value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
  totalDownvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}







fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}

`;

export const userPublicationsQuery = `
query Publications($id: ProfileId!) {
  publications(request: {
    profileId: $id,
    publicationTypes: [POST, COMMENT, MIRROR],
    limit:10
  }) {
    items {
      __typename 
      ... on Post {
        ...PostFields
      }
      ... on Comment {
        ...CommentFields
      }
      ... on Mirror {
        ...MirrorFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  mimeType
}

fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
     displayType
     traitType
     key
     value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment PublicationStatsFields on PublicationStats { 
  totalAmountOfMirrors
  totalAmountOfCollects
  totalAmountOfComments
  totalUpvotes
  totalDownvotes
}

fragment MetadataOutputFields on MetadataOutput {
  name
  description
  content
  media {
    original {
      ...MediaFields
    }
  }
  attributes {
    displayType
    traitType
    value
  }
}

fragment Erc20Fields on Erc20 {
  name
  symbol
  decimals
  address
}

fragment PostFields on Post {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment MirrorBaseFields on Mirror {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  hasCollectedByMe
}

fragment MirrorFields on Mirror {
  ...MirrorBaseFields
  mirrorOf {
   ... on Post {
      ...PostFields          
   }
   ... on Comment {
      ...CommentFields          
   }
  }
}

fragment CommentBaseFields on Comment {
  id
  profile {
    ...ProfileFields
  }
  stats {
    ...PublicationStatsFields
  }
  metadata {
    ...MetadataOutputFields
  }
  createdAt
  collectModule {
    ...CollectModuleFields
  }
  referenceModule {
    ...ReferenceModuleFields
  }
  appId
  hidden
  reaction(request: null)
  mirrors(by: null)
  hasCollectedByMe
}

fragment CommentFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
      ...MirrorBaseFields
      mirrorOf {
        ... on Post {
           ...PostFields          
        }
        ... on Comment {
           ...CommentMirrorOfFields        
        }
      }
    }
  }
}

fragment CommentMirrorOfFields on Comment {
  ...CommentBaseFields
  mainPost {
    ... on Post {
      ...PostFields
    }
    ... on Mirror {
       ...MirrorBaseFields
    }
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

fragment CollectModuleFields on CollectModule {
  __typename
  ... on FreeCollectModuleSettings {
    type
    followerOnly
    contractAddress
  }
  ... on FeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
  }
  ... on LimitedTimedFeeCollectModuleSettings {
    type
    collectLimit
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on RevertCollectModuleSettings {
    type
  }
  ... on TimedFeeCollectModuleSettings {
    type
    amount {
      asset {
        ...Erc20Fields
      }
      value
    }
    recipient
    referralFee
    endTimestamp
  }
  ... on UnknownCollectModuleSettings {
    type
    contractAddress
    collectModuleReturnData
  }
}

fragment ReferenceModuleFields on ReferenceModule {
  ... on FollowOnlyReferenceModuleSettings {
    type
    contractAddress
  }
  ... on UnknownReferenceModuleSettings {
    type
    contractAddress
    referenceModuleReturnData
  }
  ... on DegreesOfSeparationReferenceModuleSettings {
    type
    contractAddress
    commentsRestricted
    mirrorsRestricted
    degreesOfSeparation
  }
}

`;

export const recommendProfiles = `
query RecommendedProfiles {
    recommendedProfiles {
          id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
          followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
    }
  }
`;

export const viewPublicationQuery = `
# Writequery Publication {
  query Publication($id: InternalPublicationId!) {
   publication(request: {
     publicationId: $id
   }) {
    __typename 
     ... on Post {
       ...PostFields
     }
     ... on Comment {
       ...CommentFields
     }
     ... on Mirror {
       ...MirrorFields
     }
   }
 }
 
 fragment MediaFields on Media {
   url
   mimeType
 }
 
 fragment ProfileFields on Profile {
   id
   name
   bio
   attributes {
     displayType
     traitType
     key
     value
   }
   isFollowedByMe
   isFollowing(who: null)
   followNftAddress
   metadata
   isDefault
   handle
   picture {
     ... on NftImage {
       contractAddress
       tokenId
       uri
       verified
     }
     ... on MediaSet {
       original {
         ...MediaFields
       }
     }
   }
   coverPicture {
     ... on NftImage {
       contractAddress
       tokenId
       uri
       verified
     }
     ... on MediaSet {
       original {
         ...MediaFields
       }
     }
   }
   ownedBy
   dispatcher {
     address
   }
   stats {
     totalFollowers
     totalFollowing
     totalPosts
     totalComments
     totalMirrors
     totalPublications
     totalCollects
   }
   followModule {
     ...FollowModuleFields
   }
 }
 
 fragment PublicationStatsFields on PublicationStats { 
   totalAmountOfMirrors
   totalAmountOfCollects
   totalAmountOfComments
 }
 
 fragment MetadataOutputFields on MetadataOutput {
   name
   description
   content
   media {
     original {
       ...MediaFields
     }
   }
   attributes {
     displayType
     traitType
     value
   }
 }
 
 fragment Erc20Fields on Erc20 {
   name
   symbol
   decimals
   address
 }
 
 fragment PostFields on Post {
   id
   profile {
     ...ProfileFields
   }
   stats {
     ...PublicationStatsFields
   }
   metadata {
     ...MetadataOutputFields
   }
   createdAt
   collectModule {
     ...CollectModuleFields
   }
   referenceModule {
     ...ReferenceModuleFields
   }
   appId
   hidden
   reaction(request: null)
   mirrors(by: null)
   hasCollectedByMe
 }
 
 fragment MirrorBaseFields on Mirror {
   id
   profile {
     ...ProfileFields
   }
   stats {
     ...PublicationStatsFields
   }
   metadata {
     ...MetadataOutputFields
   }
   createdAt
   collectModule {
     ...CollectModuleFields
   }
   referenceModule {
     ...ReferenceModuleFields
   }
   appId
   hidden
   reaction(request: null)
   hasCollectedByMe
 }
 
 fragment MirrorFields on Mirror {
   ...MirrorBaseFields
   mirrorOf {
    ... on Post {
       ...PostFields          
    }
    ... on Comment {
       ...CommentFields          
    }
   }
 }
 
 fragment CommentBaseFields on Comment {
   id
   profile {
     ...ProfileFields
   }
   stats {
     ...PublicationStatsFields
   }
   metadata {
     ...MetadataOutputFields
   }
   createdAt
   collectModule {
     ...CollectModuleFields
   }
   referenceModule {
     ...ReferenceModuleFields
   }
   appId
   hidden
   reaction(request: null)
   mirrors(by: null)
   hasCollectedByMe
 }
 
 fragment CommentFields on Comment {
   ...CommentBaseFields
   mainPost {
     ... on Post {
       ...PostFields
     }
     ... on Mirror {
       ...MirrorBaseFields
       mirrorOf {
         ... on Post {
            ...PostFields          
         }
         ... on Comment {
            ...CommentMirrorOfFields        
         }
       }
     }
   }
 }
 
 fragment CommentMirrorOfFields on Comment {
   ...CommentBaseFields
   mainPost {
     ... on Post {
       ...PostFields
     }
     ... on Mirror {
        ...MirrorBaseFields
     }
   }
 }
 
 fragment FollowModuleFields on FollowModule {
   ... on FeeFollowModuleSettings {
     type
     amount {
       asset {
         name
         symbol
         decimals
         address
       }
       value
     }
     recipient
   }
   ... on ProfileFollowModuleSettings {
     type
     contractAddress
   }
   ... on RevertFollowModuleSettings {
     type
     contractAddress
   }
   ... on UnknownFollowModuleSettings {
     type
     contractAddress
     followModuleReturnData
   }
 }
 
 fragment CollectModuleFields on CollectModule {
   __typename
   ... on FreeCollectModuleSettings {
     type
     followerOnly
     contractAddress
   }
   ... on FeeCollectModuleSettings {
     type
     amount {
       asset {
         ...Erc20Fields
       }
       value
     }
     recipient
     referralFee
   }
   ... on LimitedFeeCollectModuleSettings {
     type
     collectLimit
     amount {
       asset {
         ...Erc20Fields
       }
       value
     }
     recipient
     referralFee
   }
   ... on LimitedTimedFeeCollectModuleSettings {
     type
     collectLimit
     amount {
       asset {
         ...Erc20Fields
       }
       value
     }
     recipient
     referralFee
     endTimestamp
   }
   ... on RevertCollectModuleSettings {
     type
   }
   ... on TimedFeeCollectModuleSettings {
     type
     amount {
       asset {
         ...Erc20Fields
       }
       value
     }
     recipient
     referralFee
     endTimestamp
   }
   ... on UnknownCollectModuleSettings {
     type
     contractAddress
     collectModuleReturnData
   }
 }
 
 fragment ReferenceModuleFields on ReferenceModule {
   ... on FollowOnlyReferenceModuleSettings {
     type
     contractAddress
   }
   ... on UnknownReferenceModuleSettings {
     type
     contractAddress
     referenceModuleReturnData
   }
   ... on DegreesOfSeparationReferenceModuleSettings {
     type
     contractAddress
     commentsRestricted
     mirrorsRestricted
     degreesOfSeparation
   }
 }
 
`;

export const challenge = gql`
  query Challenge($address: EthereumAddress!) {
    challenge(request: { address: $address }) {
      text
    }
  }
`;

export const authenticate = gql`
  mutation Authenticate($address: EthereumAddress!, $signature: Signature!) {
    authenticate(request: { address: $address, signature: $signature }) {
      accessToken
      refreshToken
    }
  }
`;

export const createProfile = gql`
  mutation CreateProfile {
    createProfile(request: { handle: "adetutu" }) {
      __typename
    }
  }
`;

export const publishPost = `
mutation CreatePostTypedData($id: ProfileId!, $uri:Url!) {
  createPostTypedData(request: {
    profileId: $id,
    contentURI: $uri,
    collectModule: {
      revertCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}`;
export const publishComment = `
mutation CreateCommentTypedData($id: ProfileId!, $uri:Url!, $publishId: InternalPublicationId!) {
  createCommentTypedData(request: {
    profileId: $id,
    contentURI: $uri,
    publicationId: $publishId
    collectModule: {
      revertCollectModule: true
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }) {
    id
    expiresAt
    typedData {
      types {
        CommentWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        profileIdPointed
        pubIdPointed
        contentURI
        referenceModuleData
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}
`;

export const defaultProfileQuery = `
query DefaultProfile($address: EthereumAddress!) {
  defaultProfile(request: { ethereumAddress: $address}) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        contractAddress
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }
}`;

export const addReactionMutation = `
mutation AddReaction($profileId: ProfileId!, $reaction:ReactionTypes!, $publicationId: InternalPublicationId!) {
  addReaction(request: { profileId:$profileId , reaction: $reaction, publicationId: $publicationId })
}
`;

export const whoReactedQuery = `
query WhoReactedPublication($publicationId: InternalPublicationId!) {
  whoReactedPublication(request: { publicationId: $publicationId }) {
    items {
      reactionId
      reaction
      reactionAt
      profile {
        ...ProfileFields
      }
    }
    pageInfo {
      prev
      next
      totalCount
    }
  }
}

fragment MediaFields on Media {
  url
  width
  height
  mimeType
}


fragment ProfileFields on Profile {
  id
  name
  bio
  attributes {
    displayType
    traitType
    key
    value
  }
  isFollowedByMe
  isFollowing(who: null)
  followNftAddress
  metadata
  isDefault
  handle
  picture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  coverPicture {
    ... on NftImage {
      contractAddress
      tokenId
      uri
      verified
    }
    ... on MediaSet {
      original {
        ...MediaFields
      }
      small {
        ...MediaFields
      }
      medium {
        ...MediaFields
      }
    }
  }
  ownedBy
  dispatcher {
    address
  }
  stats {
    totalFollowers
    totalFollowing
    totalPosts
    totalComments
    totalMirrors
    totalPublications
    totalCollects
  }
  followModule {
    ...FollowModuleFields
  }
}

fragment FollowModuleFields on FollowModule {
  ... on FeeFollowModuleSettings {
    type
    amount {
      asset {
        name
        symbol
        decimals
        address
      }
      value
    }
    recipient
  }
  ... on ProfileFollowModuleSettings {
    type
    contractAddress
  }
  ... on RevertFollowModuleSettings {
    type
    contractAddress
  }
  ... on UnknownFollowModuleSettings {
    type
    contractAddress
    followModuleReturnData
  }
}

`;
