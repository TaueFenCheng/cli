import styles from './button.module.scss'

interface Iprops {
  text:string
}

export default function Button(props:Iprops) {
  const { text } = props
  return (
    <div className={styles.btn}>
      <p>{text}</p>
    </div>
  )
}
