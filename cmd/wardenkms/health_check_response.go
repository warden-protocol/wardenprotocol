package main

type HealthCheckResponse struct {
	// The number of nodes that are online
	Online uint `json:"online"`

	// The total number of nodes
	Total uint `json:"total"`

	// The consensus threshold
	Threshold uint8 `json:"threshold"`

	// Node statuses
	Nodes []NodeStatus `json:"nodes"`
}

type NodeStatus struct {
	// The address of the node
	Address string `json:"address"`

	// The status of the node
	Status string `json:"status"`
}
