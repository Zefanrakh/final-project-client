import "./styles.scss";
import CardAppointment from "../cardAppointment";
import CardMember from "../cardMember";
import CardPresenceList from "../cardPresenceList";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";

const MainBoard = ({
  isAppointment,
  listHeader,
  data,
  isMemberPage,
  isPresenceListPage,
}) => {
  console.log(data, 'di mainboard ===>');
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
        data.map((user, idx) => {
          return isMemberPage ? (
            <CardMember key={idx} user={user} />
          ) : isPresenceListPage ? (
            <CardPresenceList key={idx} user={user} />
          ) : (
            <CardAppointment key={idx} user={user} isAppointment={isAppointment} />
          );
        })}
    </div>
  );
};

export default MainBoard;
