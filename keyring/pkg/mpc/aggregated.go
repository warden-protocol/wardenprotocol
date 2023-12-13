package mpc

type aggregatedClient struct {
	clients chan Client
}

func (a aggregatedClient) PublicKey(keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.PublicKey(keyID, keyType)
}

func (a aggregatedClient) PubkeySignature(pubKey, keyID []byte, keyType CryptoSystem) ([]byte, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.PubkeySignature(pubKey, keyID, keyType)
}

func (a aggregatedClient) Signature(sigRequestData *SigRequestData, keyType CryptoSystem) (*SigResponse, string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.Signature(sigRequestData, keyType)
}

func (a aggregatedClient) Ping() (string, error) {
	client := <-a.clients
	defer func() {
		a.clients <- client
	}()
	return client.Ping()
}
