import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import DocCard from "./DocCard";
import NameCard from "./NameCard";
import { buildTree } from "./svg/path";
import { TreeNode } from "./TreeNode";


type ConnectorProps = {
  branchCount: number;
}

function Connector({ branchCount }: ConnectorProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const [windowsResize, setWindowsResize] = useState(Date.now());

  const handleWindowsResize = () => setWindowsResize(Date.now())
  useEffect(() => {
    window.addEventListener('resize', handleWindowsResize);
    return () => {
      window.removeEventListener('resize', handleWindowsResize);
    }
  }, [])

  useEffect(() => {
    const pathNode = pathRef.current;
    if (pathNode) {
      const { clientWidth, clientHeight } = pathNode.parentElement!;
      pathNode.setAttribute('d', buildTree(clientWidth, clientHeight, branchCount));
    }
  }, [branchCount, windowsResize]);

  return <svg style={{ width: '100%', height: '100px' }} xmlns="http://www.w3.org/2000/svg">
    <path ref={pathRef} stroke="#0dc" fill="none" strokeWidth={2} />
  </svg>

}

const tree: TreeNode = {
  node: <NameCard name="John" />,
  children: [{
    node: <NameCard name="Gift" />,
    children: [
      {
        node: <NameCard name="Sarah" />,
        children: [{ node: <DocCard name="Sarah Plan" />, }]
      },
      {
        node: <NameCard name="Inigo" />,
        children: [{ node: <DocCard name="Inigo Plan" />, }]
      },
      {
        node: <NameCard name="Kenndy" />,
        children: [{ node: <DocCard name="Kenndy Plan" />, }]
      },
      {
        node: <NameCard name="Kenndy" />,
        children: [{ node: <DocCard name="Kenndy Plan" />, }]
      },
      {
        node: <NameCard name="Kenndy" />,
        children: [{ node: <DocCard name="Kenndy Plan" />, }]
      },
    ]
  }, {
    node: <NameCard name="Gift" />,
    children: [
      {
        node: <NameCard name="Sarah" />,
        children: [{ node: <DocCard name="Sarah Plan" />, }]
      },
      {
        node: <NameCard name="Inigo" />,
        children: [{ node: <DocCard name="Inigo Plan" />, }]
      },
    ]
  }]
};

type TreeProps = {
  node: TreeNode,
}

function Tree({ node }: TreeProps) {
  return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
    {node.node}
    {node.children?.length && <>
      <Connector branchCount={node.children.length} />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
        {node.children?.map((n, i) => <Tree key={i} node={n} />)}
      </Box>
    </>}
  </Box>
}

export default function BoxUsage() {

  return <Box sx={{ position: 'relative' }}>
    <Tree node={tree} />
  </Box>
}
