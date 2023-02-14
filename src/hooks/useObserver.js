import { useRef, useEffect } from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {

    const observer = useRef();

    useEffect(() => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();
        //console.log('useEffect -> : ', page)
        //Intersection Observer API
        //var options = {root: document}
        var cb = function(entries, observer) {
          if (entries[0].isIntersecting && canLoad){
            //console.log("div is visible")
            //console.log('page: ', page)
            //setPage(page + 1)
            callback();
          }
        }
        observer.current = new IntersectionObserver(cb);
        observer.current.observe(ref.current)
      }, [isLoading])
}