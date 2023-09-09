import { NavLink } from 'react-router-dom';
import pb from '@/api/pocketbase';
import { useState, useEffect } from 'react';
import { getPbImageURL } from '@/utils';

export default function MainContent({ src, alt, title }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState('pending');
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    async function getContentList() {
      try {
        setStatus('loading');
        const contentList = await pb.collection('content').getList(1, 3);
        console.log('contentList:', contentList);
        setData(contentList);
        setStatus('success');
        setTotalItems(contentList.totalItems); // API 응답에서 total 값 업데이트
      } catch (error) {
        setStatus('error');
      }
    }

    getContentList();
  }, [page]);

  return (
    <>
      {data?.items?.map((item) => (
        <li
          key={item.id}
          className="w-1/3 border-2 border-slate-300 border-solid rounded"
        >
          <NavLink to="/content">
            <figure className="">
              <img src={getPbImageURL(item, 'photo')} alt={item.tag} />

              <figcaption className="py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
                {item.title}
              </figcaption>
            </figure>
          </NavLink>
        </li>
      ))}

      {/* Pagination Controls */}
      {/* <button
        onClick={() => setPage((prevPage) => prevPage - 1)}
        disabled={page === 1}
      >
        Previous Page
      </button>

      <span>Page: {page}</span>

      <button
        onClick={() => setPage((prevPage) => prevPage + 1)}
        disabled={page >= Math.ceil(totalItems / 3)}
      >
        Next Page
      </button> */}

      {/* <li className="w-1/3 border-2 border-slate-300 border-solid rounded">
        <NavLink to="/content">
          <figure>
            <img src={src} alt={alt} />
            <figcaption className="py-4 pl-4 overflow-hidden text-ellipsis whitespace-nowrap">
              {title}
            </figcaption>
          </figure>
        </NavLink>
      </li> */}
    </>
  );
}
