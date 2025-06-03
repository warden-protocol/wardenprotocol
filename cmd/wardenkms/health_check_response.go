package main

type HealthCheckResponse struct {
	// Online is the number of nodes that are online
	Online uint `json:"online"`

	// Total is the total number of nodes
	Total uint `json:"total"`

	// Threshold is the consensus threshold
	Threshold uint8 `json:"threshold"`

	// Nodes is a node statuses collection
	Nodes []NodeStatus `json:"nodes"`
}

type NodeStatus struct {
	// Address is the address of the node
	Address string `json:"address"`

	// Status is the status of the node
	Status string `json:"status"`
}
