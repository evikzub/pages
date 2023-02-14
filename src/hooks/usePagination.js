import {useMemo} from "react"

export const usePagination = (totalPages) => {
    const definePages = useMemo(() => {
        console.log('usePagination, totalPages: ', totalPages)
        let pagesArray = []
        for (let i = 0; i < totalPages; i++) {
          pagesArray.push(i+1)
        }
        return pagesArray;
    }, [totalPages])

    return definePages
}