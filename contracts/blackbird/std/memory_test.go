package std

import (
	"encoding/binary"
	"encoding/hex"
	"testing"
	"unsafe"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

// TestBuildSectionsRegion checks section region build by verifying the result on bytes level.
func TestBuildSectionsRegion(t *testing.T) {
	type Section struct {
		Size uint32
		Data []byte
	}

	// Create a region with section edge cases
	sectionsData := [][]byte{
		{0x01},
		{0x02, 0x03},
		nil,
		{0x04, 0x05, 0x06},
		{},
		{0x07, 0x08, 0x09, 0x0a},
	}
	regionPtr, _ := BuildSectionsRegion(sectionsData)

	// Read raw bytes from memory
	regionSizeExpected := int(REGION_HEAD_SIZE)
	for _, s := range sectionsData {
		if s == nil {
			continue
		}
		regionSizeExpected += len(s) + 4
	}

	var regionBytes []byte
	for i := 0; i < regionSizeExpected; i++ {
		regionBytes = append(regionBytes, *(*byte)(regionPtr))
		regionPtr = unsafe.Add(regionPtr, 1)
	}

	// Parse raw bytes for region
	region := MemRegion{}
	region.Offset = binary.LittleEndian.Uint32(regionBytes[0:4])
	region.Capacity = binary.LittleEndian.Uint32(regionBytes[4:8])
	region.Length = binary.LittleEndian.Uint32(regionBytes[8:12])

	// Parse raw bytes for sections (backwards)
	sections := make([]Section, 0, len(sectionsData))
	for i := len(regionBytes) - 4; i > 12; {
		sectionHeader := binary.BigEndian.Uint32(regionBytes[i : i+4])

		var sectionData []byte
		if sectionHeader > 0 {
			sectionData = regionBytes[i-int(sectionHeader) : i]
		}

		sections = append(sections, Section{
			Size: sectionHeader,
			Data: sectionData,
		})

		i -= int(sectionHeader)
		i -= 4
	}
	for i, j := 0, len(sections)-1; i < j; i, j = i+1, j-1 {
		sections[i], sections[j] = sections[j], sections[i]
	}

	// Print
	t.Logf("Region.Offset:\t%d", region.Offset)
	t.Logf("Region.Capacity:\t%d", region.Capacity)
	t.Logf("Region.Length:\t%d", region.Length)
	for i, section := range sections {
		t.Logf("Section[%d]: 0x%s (%d)", i, hex.EncodeToString(section.Data), section.Size)
	}

	// Verify
	assert.NotEmpty(t, region.Offset)
	assert.EqualValues(t, 30, region.Capacity)
	assert.EqualValues(t, 30, region.Length)

	require.Len(t, sections, 5)
	// Section 0
	assert.EqualValues(t, 1, sections[0].Size)
	assert.Equal(t, sectionsData[0], sections[0].Data)
	// Section 1
	assert.EqualValues(t, 2, sections[1].Size)
	assert.Equal(t, sectionsData[1], sections[1].Data)
	// Section 2
	assert.EqualValues(t, 3, sections[2].Size)
	assert.Equal(t, sectionsData[3], sections[2].Data)
	// Section 3
	assert.EqualValues(t, 0, sections[3].Size)
	assert.Empty(t, sections[3].Data)
	// Section 4
	assert.EqualValues(t, 4, sections[4].Size)
	assert.Equal(t, sectionsData[5], sections[4].Data)
}
