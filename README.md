# Severance Terminal PoC

> Render Screen Using Pixel

[Pixel](https://github.com/faiface/pixel)

┌─────────────────┐
│ 1 2 6 8 3 3 0 5 │
│ 1 2 6 8 3 3 1 1 │
│ 1 2 6 8 3 3 2 9 │
│ 1 2 6 8 3 3 5 4 │
│ 1 2 6 8 3 3 2 8 │
│ 1 2 6 8 3 3 0 1 │
│ 1 2 6 8 8 6 3 3 │
│ 1 2 2 4 6 8 3 3 │
└─────────────────┘

* 512px x 512px Grid
* 8 x 8 Cols (64px Cell)

* Nums Rendered as Sprites (Bounding Box of 64x64)

```go

type Num struct {
  Value int
  Index []int
}

func (n *Num) Vectors() (x int, y int) {
  vx := n.ID[0] * 64
  vy := n.ID[1] * 64
  v := pixel.V(vx, vy)
  return v.x, v.y
}

// Create Position from Vector Index i,j

n := Num{
    Value: (Random 0-9),
    Index: []int{2,3},
   }

```

