export default function Title() {
  return (
    <>
      <h1>
        b<span>eau</span>t<span>i</span>f<span>u</span>l<span>.</span>link
      </h1>
      <p>just another URL shortener.</p>
      <style jsx>{`
        h1,
        p {
          color: var(--white);
          font-size: 25px;
        }
        h1 {
          font-size: 50px;
          margin-bottom: 10px;
          font-weight: normal;
        }
        h1 span {
          color: var(--light-white);
        }
      `}</style>
    </>
  )
}
