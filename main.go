package main

import (
	"math/rand"
	"strconv"

	tl "github.com/JoelOtter/termloop"
)

var events []string

type Sprite struct {
	*tl.Text
}

func NewSprite(x, y int, value string) *Sprite {
	return &Sprite{tl.NewText(x, y, value, tl.ColorCyan, tl.ColorBlack)}
}

func (s *Sprite) Tick(ev tl.Event) {
	if ev.Type != tl.EventMouse {
		return
	}

	switch ev.Key {
	case tl.MouseLeft:
		x, y := s.Position()
		eq := ev.MouseX == x && ev.MouseY == y
		mi := ev.MouseX == x-1 && ev.MouseY == y-1
		ma := ev.MouseX == x+1 && ev.MouseY == y+1
		if eq || mi || ma {
			s.SetText(" ")
		}
	}

}

func RandN() string {
	return strconv.Itoa(rand.Intn(10))
}

func main() {

	// Create New Game Loop
	game := tl.NewGame()
	game.Screen().SetFps(120)
	lvl := tl.NewBaseLevel(tl.Cell{Bg: tl.ColorBlack, Fg: tl.ColorWhite})

	// Add Sprites
	// To Create Even Spacing We Ensure range(x) / 2 = range(y)
	// and double X's modulo for skip-spacing checks
	mX := 64
	mY := mX / 2
	for x := 0; x < mX; x++ {
		for y := 0; y < mY; y++ {
			if x%4 == 0 && y%2 == 0 && x != 0 && y != 0 {
				s := NewSprite(x, y, RandN())
				lvl.AddEntity(s)
			}
		}
	}

	// Run Game
	game.Screen().SetLevel(lvl)
	game.Start()

}
