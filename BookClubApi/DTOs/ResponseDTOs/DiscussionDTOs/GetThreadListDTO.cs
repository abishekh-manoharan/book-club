using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class GetThreadListDTO
{
    public GetThreadListDTO(List<NonDeletedThreadDTO> nonDeletedTreadDTOs, List<DeletedThreadDTO> deletedTreadDTOs)
    {
        NonDeletedTreadDTOs = nonDeletedTreadDTOs;
        DeletedTreadDTOs = deletedTreadDTOs;
    }

    public List<NonDeletedThreadDTO> NonDeletedTreadDTOs { get; set; } = [];
    public List<DeletedThreadDTO> DeletedTreadDTOs { get; set; } = [];

}
