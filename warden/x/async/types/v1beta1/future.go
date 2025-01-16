package v1beta1

func (v FutureVoteType) IsValid() bool {
	_, ok := FutureVoteType_name[int32(v)]
	return ok
}
