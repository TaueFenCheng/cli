import styles from './index.module.scss'

export default function Button() {
  const handleClick = () => {
    console.log(33333333333333333333)
  }
  return (
    <div className={styles.button} onClick={handleClick}>
      Button
    </div>
  )
}
