import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Participant as ParticipantModel, Episode as EpisodeModel } from '@prisma/client';
import { GqlContext } from './context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateEpisodeForm = {
  body: Scalars['String'];
  description: Scalars['String'];
  guestsIDs: Array<Scalars['ID']>;
  hostID: Scalars['ID'];
  image: Scalars['String'];
  resources: Array<InputMaybe<Scalars['String']>>;
  scheduledTime: Scalars['DateTime'];
  title: Scalars['String'];
};

export type CreateParticipantForm = {
  avatar?: InputMaybe<Scalars['String']>;
  bio: Scalars['String'];
  email: Scalars['String'];
  github: Scalars['String'];
  linkedin?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: InputMaybe<Scalars['String']>;
};

export type Episode = {
  __typename?: 'Episode';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  guests: Array<Participant>;
  host: Participant;
  id: Scalars['ID'];
  image: Scalars['String'];
  resources: Array<Maybe<Scalars['String']>>;
  scheduledTime: Scalars['DateTime'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type GetEpisodesEdge = {
  __typename?: 'GetEpisodesEdge';
  episode: Episode;
};

export type GetEpisodesRes = {
  __typename?: 'GetEpisodesRes';
  edges: Array<GetEpisodesEdge>;
  total: Scalars['Int'];
};

export type GetParticipantsEdge = {
  __typename?: 'GetParticipantsEdge';
  participant: Participant;
};

export type GetParticipantsRes = {
  __typename?: 'GetParticipantsRes';
  edges: Array<GetParticipantsEdge>;
  total: Scalars['Int'];
};

export type LoginRes = {
  __typename?: 'LoginRes';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Scalars['Boolean'];
  createEpisode: Episode;
  createParticipant: Participant;
  login: LoginRes;
  refresh: Scalars['String'];
  register: Scalars['Boolean'];
  updateEpisode: Episode;
  updateParticipant: Participant;
};


export type MutationCreateEpisodeArgs = {
  form: CreateEpisodeForm;
};


export type MutationCreateParticipantArgs = {
  form: CreateParticipantForm;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateEpisodeArgs = {
  form: UpdateEpisodeForm;
  id: Scalars['ID'];
};


export type MutationUpdateParticipantArgs = {
  form: UpdateParticipantForm;
  id: Scalars['ID'];
};

export type Participant = {
  __typename?: 'Participant';
  avatar: Scalars['String'];
  bio: Scalars['String'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  github: Scalars['String'];
  id: Scalars['ID'];
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  _: Scalars['Boolean'];
  getEpisode?: Maybe<Episode>;
  getEpisodes: GetEpisodesRes;
  getParticipant?: Maybe<Participant>;
  getParticipants: GetParticipantsRes;
};


export type QueryGetEpisodeArgs = {
  id: Scalars['ID'];
};


export type QueryGetEpisodesArgs = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryGetParticipantArgs = {
  id: Scalars['String'];
};


export type QueryGetParticipantsArgs = {
  search?: InputMaybe<Scalars['String']>;
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type UpdateEpisodeForm = {
  body: Scalars['String'];
  description: Scalars['String'];
  image: Scalars['String'];
  resources: Array<InputMaybe<Scalars['String']>>;
  scheduledTime: Scalars['DateTime'];
  title: Scalars['String'];
};

export type UpdateParticipantForm = {
  avatar?: InputMaybe<Scalars['String']>;
  bio: Scalars['String'];
  email: Scalars['String'];
  github: Scalars['String'];
  linkedin?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: InputMaybe<Scalars['String']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateEpisodeForm: CreateEpisodeForm;
  CreateParticipantForm: CreateParticipantForm;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Episode: ResolverTypeWrapper<EpisodeModel>;
  GetEpisodesEdge: ResolverTypeWrapper<Omit<GetEpisodesEdge, 'episode'> & { episode: ResolversTypes['Episode'] }>;
  GetEpisodesRes: ResolverTypeWrapper<Omit<GetEpisodesRes, 'edges'> & { edges: Array<ResolversTypes['GetEpisodesEdge']> }>;
  GetParticipantsEdge: ResolverTypeWrapper<Omit<GetParticipantsEdge, 'participant'> & { participant: ResolversTypes['Participant'] }>;
  GetParticipantsRes: ResolverTypeWrapper<Omit<GetParticipantsRes, 'edges'> & { edges: Array<ResolversTypes['GetParticipantsEdge']> }>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginRes: ResolverTypeWrapper<LoginRes>;
  Mutation: ResolverTypeWrapper<{}>;
  Participant: ResolverTypeWrapper<ParticipantModel>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateEpisodeForm: UpdateEpisodeForm;
  UpdateParticipantForm: UpdateParticipantForm;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  CreateEpisodeForm: CreateEpisodeForm;
  CreateParticipantForm: CreateParticipantForm;
  DateTime: Scalars['DateTime'];
  Episode: EpisodeModel;
  GetEpisodesEdge: Omit<GetEpisodesEdge, 'episode'> & { episode: ResolversParentTypes['Episode'] };
  GetEpisodesRes: Omit<GetEpisodesRes, 'edges'> & { edges: Array<ResolversParentTypes['GetEpisodesEdge']> };
  GetParticipantsEdge: Omit<GetParticipantsEdge, 'participant'> & { participant: ResolversParentTypes['Participant'] };
  GetParticipantsRes: Omit<GetParticipantsRes, 'edges'> & { edges: Array<ResolversParentTypes['GetParticipantsEdge']> };
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  LoginRes: LoginRes;
  Mutation: {};
  Participant: ParticipantModel;
  Query: {};
  String: Scalars['String'];
  UpdateEpisodeForm: UpdateEpisodeForm;
  UpdateParticipantForm: UpdateParticipantForm;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type EpisodeResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['Episode'] = ResolversParentTypes['Episode']> = ResolversObject<{
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  guests?: Resolver<Array<ResolversTypes['Participant']>, ParentType, ContextType>;
  host?: Resolver<ResolversTypes['Participant'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resources?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  scheduledTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetEpisodesEdgeResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['GetEpisodesEdge'] = ResolversParentTypes['GetEpisodesEdge']> = ResolversObject<{
  episode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetEpisodesResResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['GetEpisodesRes'] = ResolversParentTypes['GetEpisodesRes']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['GetEpisodesEdge']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetParticipantsEdgeResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['GetParticipantsEdge'] = ResolversParentTypes['GetParticipantsEdge']> = ResolversObject<{
  participant?: Resolver<ResolversTypes['Participant'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type GetParticipantsResResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['GetParticipantsRes'] = ResolversParentTypes['GetParticipantsRes']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['GetParticipantsEdge']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginResResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['LoginRes'] = ResolversParentTypes['LoginRes']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<MutationCreateEpisodeArgs, 'form'>>;
  createParticipant?: Resolver<ResolversTypes['Participant'], ParentType, ContextType, RequireFields<MutationCreateParticipantArgs, 'form'>>;
  login?: Resolver<ResolversTypes['LoginRes'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  refresh?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationRefreshArgs, 'refreshToken'>>;
  register?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password'>>;
  updateEpisode?: Resolver<ResolversTypes['Episode'], ParentType, ContextType, RequireFields<MutationUpdateEpisodeArgs, 'form' | 'id'>>;
  updateParticipant?: Resolver<ResolversTypes['Participant'], ParentType, ContextType, RequireFields<MutationUpdateParticipantArgs, 'form' | 'id'>>;
}>;

export type ParticipantResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']> = ResolversObject<{
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bio?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  github?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = GqlContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  _?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  getEpisode?: Resolver<Maybe<ResolversTypes['Episode']>, ParentType, ContextType, RequireFields<QueryGetEpisodeArgs, 'id'>>;
  getEpisodes?: Resolver<ResolversTypes['GetEpisodesRes'], ParentType, ContextType, RequireFields<QueryGetEpisodesArgs, 'skip' | 'take'>>;
  getParticipant?: Resolver<Maybe<ResolversTypes['Participant']>, ParentType, ContextType, RequireFields<QueryGetParticipantArgs, 'id'>>;
  getParticipants?: Resolver<ResolversTypes['GetParticipantsRes'], ParentType, ContextType, RequireFields<QueryGetParticipantsArgs, 'skip' | 'take'>>;
}>;

export type Resolvers<ContextType = GqlContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  Episode?: EpisodeResolvers<ContextType>;
  GetEpisodesEdge?: GetEpisodesEdgeResolvers<ContextType>;
  GetEpisodesRes?: GetEpisodesResResolvers<ContextType>;
  GetParticipantsEdge?: GetParticipantsEdgeResolvers<ContextType>;
  GetParticipantsRes?: GetParticipantsResResolvers<ContextType>;
  LoginRes?: LoginResResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Participant?: ParticipantResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

