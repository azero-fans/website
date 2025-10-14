---
sidebar_position: 2
sidebar_label: Generic
description: How to run your very own Validator.
---
    
# Generic Nodes



```mermaid
---
title: A Validator node
---

flowchart TB
   cloud1@{ shape: cloud, label: "peers" } <-. "p2p connection" .-> node
   subgraph box1 [machine]
      direction LR
      style box1 fill:lightblue,stroke-dasharray: 5 5
      subgraph box2 [Aleph Zero]
         direction LR
         node
         db1@{ shape: cyl, label: "db" }
      end
   end
```

## Working components of a Node:

In the following subtitles you will configure the necessary aspects of your validator node, these will be the exact same aspects needed for a bootnode or an archivist node (only  )

