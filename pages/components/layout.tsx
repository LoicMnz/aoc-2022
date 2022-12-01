import Navbar from "./navbar";
import Footer from "./footer";
import styles from "/styles/Layout.module.css";
interface Props {
  children: React.ReactNode;
}
const Layout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className={styles.body}>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
