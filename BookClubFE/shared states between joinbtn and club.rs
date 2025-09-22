// JB
useGetClubQuery - data
useGetUserIdQuery - data
const { data: clubUser, error: getClubUserError, isError: isClubUserError, refetch: refetchGetClubUser} = useGetClubUserQuery(
    { clubId: props.clubId, userId: userId as number },
    { skip: !userId }
);

// Club
const { data: userId } = useGetUserIdQuery();
const { data: club, isError: isGetClubError, isSuccess: isGetClubSuccess, isFetching: isGetClubFetching, isLoading: isGetClubLoading }
= useGetClubQuery(clubId);

const { data: clubUser, error: getClubUserError, isError: isClubUserError, isSuccess: isClubUserSuccess, isFetching: isClubUserFetching, refetch: refetchGetClubUser, isLoading: isClubUserLoading }
= useGetClubUserQuery(
    { clubId: clubId, userId: userId as number },
    { skip: !userId }
);