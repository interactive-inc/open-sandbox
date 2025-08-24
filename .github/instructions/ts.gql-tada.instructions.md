---
applyTo: "**"
---

# TypeScript + gql.tada

## GraphQL Colocation

Define Fragments in the same file as the component that uses them

- Use GraphQL fragments to define data dependencies
- Use `readFragment` to access data in components
- Use `graphql` function to define fragments and queries
- Fragment names should follow the `${ComponentName}Fragment` naming pattern

```tsx
import { graphql, readFragment } from "gql.tada"

type Props = {
  post: FragmentOf<typeof PostCardFragment>
}

export function PostCard(props: Props) {
  const post = readFragment(PPostCardFragment, props.post)

  return <div>{post.id}</div>
}

export const PostCardFragment = graphql(
  `fragment PostCard on PostNode {
    id
    name
  }`,
)
```

## Fetch data - useSuspenseQuery

define a query using `graphql` and use it with `useSuspenseQuery` to fetch data.

- define the query using `graphql` within the same file

```tsx
import { useSuspenseQuery } from "@apollo/client"
import { graphql } from "gql.tada"

export function MyComponent() {
  const query = useSuspenseQuery(Query, {
    variables: { id: "xxx" },
  })
}

const Query = graphql(
  `query PostQuery($id: ID!) {
    post(id: $id) {
      ...PostCardFragment
    }
  }`
)
```

## Mutations - useMutation

define a mutation using `graphql` and use it with `useMutation` to perform mutations.

```tsx
import { useMutation } from "@apollo/client"
import { graphql } from "gql.tada"

export function CreatePostForm() {
  const [createPost] = useMutation(Mutation)

  const handleCreatePost = async () => {
    await createPost({ variables: { input: { xxx: "xxx" } } })
  }

  return <button onClick={handleCreatePost}>Create Post</button>
}

const Mutation = graphql(
  `mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...PostCardFragment
    }
  }`
)
```

## Error handling

### with Apollo Client

Use `onError` to handle errors in mutations.

```ts
import { useMutation } from "@apollo/client"

const [createPost] = useMutation(Mutation, {
  onError(error) {
    toast.error(error.message)
  },
})
```

## Refetch data

Use `startTransition` to refetch data in a non-blocking way.

```tsx
import { startTransition } from "react"

function MyComponent() {
  const query = useSuspenseQuery(Query, {
    variables: { id: "xxx" },
  })

  const onRefetch = () => {
    startTransition(() => {
      query.refetch()
    })
  }
}
```

Pass the refetch function to child components for manual data refresh.

```tsx
<ChildComponent onRefetch={onRefetch} />
```
