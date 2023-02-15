import { ReactNode } from "react"

export type TreeNode = {
  node: ReactNode;
  children?: TreeNode[];
}
