package v1beta1

func (v TaskVoteType) IsValid() bool {
	_, ok := TaskVoteType_name[int32(v)]
	return ok
}
