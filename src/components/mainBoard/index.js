import "./styles.scss";
import CardAppointment from "../cardAppointment";
import CardMember from "../cardMember";
import CardPresenceList from "../cardPresenceList";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";

const MainBoard = ({
  isAppointment,
  listHeader,
  dummyData,
  isMemberPage,
  isPresenceListPage,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
  return (
    <div className="main-board">
      <div className="header__main-board">
        {listHeader.map((text) => {
          return (
            <div className={`${text === "Id" && "id-text"} text-header `}>
              {text}
            </div>
          );
        })}
      </div>
      {isLoading && (
        <SkeletonTheme color="white" highlightColor="#efefef">
          <p>
            <Skeleton circle={true} count={9} />
          </p>
        </SkeletonTheme>
      )}

      {!isLoading &&
        dummyData.map((user) => {
          return isMemberPage ? (
            <CardMember user={user} />
          ) : isPresenceListPage ? (
            <CardPresenceList user={user} />
          ) : (
            <CardAppointment user={user} isAppointment={isAppointment} />
          );
        })}
    </div>
  );
};

export default MainBoard;
