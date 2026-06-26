import type { Namespace } from "@ory/keto-namespace-types"

class User implements Namespace {}

class StormID implements Namespace {
  related: {
    member: User[]
  }
}
