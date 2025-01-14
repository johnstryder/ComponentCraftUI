/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Assests = "assests",
	Components = "components",
	LandingPages = "landingPages",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type AssestsRecord = {
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type ComponentsRecord = {
	code?: string
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type LandingPagesRecord = {
	code?: string
	control?: boolean
	conversionRate?: number
	created?: IsoDateString
	id: string
	updated?: IsoDateString
}

export type UsersRecord = {
	avatar?: string
	created?: IsoDateString
	email: string
	emailVisibility?: boolean
	id: string
	name?: string
	password: string
	tokenKey: string
	updated?: IsoDateString
	verified?: boolean
}

// Response types include system fields and match responses from the PocketBase API
export type AssestsResponse<Texpand = unknown> = Required<AssestsRecord> & BaseSystemFields<Texpand>
export type ComponentsResponse<Texpand = unknown> = Required<ComponentsRecord> & BaseSystemFields<Texpand>
export type LandingPagesResponse<Texpand = unknown> = Required<LandingPagesRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	assests: AssestsRecord
	components: ComponentsRecord
	landingPages: LandingPagesRecord
	users: UsersRecord
}

export type CollectionResponses = {
	assests: AssestsResponse
	components: ComponentsResponse
	landingPages: LandingPagesResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'assests'): RecordService<AssestsResponse>
	collection(idOrName: 'components'): RecordService<ComponentsResponse>
	collection(idOrName: 'landingPages'): RecordService<LandingPagesResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
